# Bulk file creator

Generate more file when you use the excel or other table creator app. You create the xlsx,xls or ods file and generate new files with content from every row. 

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
- `extension` - Secound column contained all file extension (not required)
- Every other column contained file content. The first row value is a line paramter name.

## Example source (sheet-1)
| name | extension | TITLE | DESCRIPTION | DATE | ETC |
|------|-----------|-------|-------------|------|-----|
| file-1 | txt | First title | Descripiton value | 2023 | etc paramters |
| file-2 | txt | Sectitle | Descripiton value | 2020 | other |
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
DESCRIPTION=Descripiton value
DATE=2023
ETC=etc paramters
```


## Supported source extensions

- xlsx
- xls
- ods

