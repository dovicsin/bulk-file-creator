# Bulk file creator

Create bulk files with or without structured directories. Be it a configuration file or a plain text file. 

The source should be a plain table that contains the header and beyond that each row will be a separate file. Just parameterize it with the appropriate flags and you're ready with lots of new files.

## Install

```sh
npm install --global @dovicsin/bulk-file-creator
```

## Usage

```sh
bulk-file-creator -s source.xlsx
```

## Flags

| Name | Flag | Short | Default | Required | Description |
|------|------|-------|---------|----------|-------------|
| Source file | --source | -s | None | true | Source file (supported: xlsx, xls, ods) |
| Target directory | --target | -t | dist/ | false | Target directory when saved all file |
| Create dirs | --dirs | -d | true | false | Create directory every files |
| Add header | --addheaderkey | -a | true | false | Add header key in content with join separator |
| Join | --join | -j | = | false | The target file content line and header separator |

## Source format headers

- `name` - First column contained the file names
- `extension` - Second column contained all file extension (not required)
- Every other column contained file content. The first row value is a line parameter name.

## Example source (sheet-1)
| name | extension | TITLE | DESCRIPTION | DATE | ETC |
|------|-----------|-------|-------------|------|-----|
| file-1 | txt | First title | Description value | 2023 | etc parameters |
| file-2 | txt | Second title | Description value | 2020 | other |
| file-3 | pdf | Pdf title | Pdf  desc | 2024 | ... |

## Result 
```sh
bulk-file-creator -s source.xlsx
```
```
dist
  sheet-1
    file-1
      file-1.txt
    file-2
      file-2.txt
    file-3
      file-3.txt
```

**Without plus dirs**
```sh
bulk-file-creator -s source.xlsx -d false
```
```
dist
  sheet-1
    file-1.txt
    file-2.txt
    file-3.txt
```

### file-1.txt
```
TITLE=First title
DESCRIPTION=Description value
DATE=2023
ETC=etc parameters
```

## Example simple content

```sh
bulk-file-creator -s source.xlsx -a false
```

| name | extension | CONTENT |
|------|-----------|---------|
| file-1 | txt | First content \n more lines |
| file-2 | txt | Sec content |
| file-3 | txt | Content |

**file-1 final content**
```text
First content
more lines
```

## Supported source extensions

- xlsx
- xls
- ods

