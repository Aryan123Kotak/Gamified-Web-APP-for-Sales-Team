<?php
// Tiny dependency-free .xlsx writer (Office Open XML) using ZipArchive.
// Supports multiple sheets of string/number cells via inline strings — enough to
// export every user's full journey into a real Excel workbook with no libraries.

class Xlsx {
  private array $sheets = []; // [ ['name'=>, 'rows'=>[[cell,...],...]] ]

  public function addSheet(string $name, array $rows): void {
    // Sheet names: max 31 chars, no []:*?/\ characters.
    $name = preg_replace('#[\\\\/\\[\\]\\*\\?:]#', ' ', $name);
    $this->sheets[] = ['name' => mb_substr($name, 0, 31), 'rows' => $rows];
  }

  public function download(string $filename): void {
    $tmp = tempnam(sys_get_temp_dir(), 'xlsx');
    $zip = new ZipArchive();
    $zip->open($tmp, ZipArchive::OVERWRITE);

    $zip->addFromString('[Content_Types].xml', $this->contentTypes());
    $zip->addFromString('_rels/.rels',
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      . '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
      . '</Relationships>');

    $zip->addFromString('xl/workbook.xml', $this->workbook());
    $zip->addFromString('xl/_rels/workbook.xml.rels', $this->workbookRels());

    foreach ($this->sheets as $i => $s) {
      $zip->addFromString('xl/worksheets/sheet' . ($i + 1) . '.xml', $this->sheetXml($s['rows']));
    }
    $zip->close();

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Length: ' . filesize($tmp));
    header('Cache-Control: no-store');
    readfile($tmp);
    @unlink($tmp);
    exit;
  }

  private function contentTypes(): string {
    $overrides = '';
    foreach ($this->sheets as $i => $s) {
      $overrides .= '<Override PartName="/xl/worksheets/sheet' . ($i + 1)
        . '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';
    }
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      . '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
      . '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
      . '<Default Extension="xml" ContentType="application/xml"/>'
      . '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
      . $overrides . '</Types>';
  }

  private function workbook(): string {
    $sheetsXml = '';
    foreach ($this->sheets as $i => $s) {
      $sheetsXml .= '<sheet name="' . $this->esc($s['name']) . '" sheetId="' . ($i + 1)
        . '" r:id="rId' . ($i + 1) . '"/>';
    }
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      . '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"'
      . ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
      . '<sheets>' . $sheetsXml . '</sheets></workbook>';
  }

  private function workbookRels(): string {
    $rels = '';
    foreach ($this->sheets as $i => $s) {
      $rels .= '<Relationship Id="rId' . ($i + 1)
        . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"'
        . ' Target="worksheets/sheet' . ($i + 1) . '.xml"/>';
    }
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      . '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
      . $rels . '</Relationships>';
  }

  private function sheetXml(array $rows): string {
    $out = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      . '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>';
    foreach ($rows as $r => $cells) {
      $out .= '<row r="' . ($r + 1) . '">';
      foreach (array_values($cells) as $c => $val) {
        $ref = $this->colLetter($c) . ($r + 1);
        if (is_int($val) || is_float($val)) {
          $out .= '<c r="' . $ref . '"><v>' . $val . '</v></c>';
        } else {
          $out .= '<c r="' . $ref . '" t="inlineStr"><is><t xml:space="preserve">'
            . $this->esc((string)$val) . '</t></is></c>';
        }
      }
      $out .= '</row>';
    }
    return $out . '</sheetData></worksheet>';
  }

  private function colLetter(int $i): string {
    $s = '';
    for ($i++; $i > 0; $i = intdiv($i - 1, 26)) $s = chr(65 + ($i - 1) % 26) . $s;
    return $s;
  }

  private function esc(string $s): string {
    // Strip control chars Excel rejects, then XML-escape.
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $s);
    return htmlspecialchars($s, ENT_QUOTES | ENT_XML1, 'UTF-8');
  }
}
