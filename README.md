
# extend-env-files

## Overview
`extend-env-files` is an NPX module that helps to prepend and merge environment variables into specific files based on a configuration. The configuration is provided via the `ENV_FILES_CONFIG` environment variable, formatted as a JSON object. Each key in this JSON object is a file path, and the associated value is a string containing `.env`-style key-value pairs. 

This module ensures that the specified environment variables are prepended to or merged into the files, overriding any existing variables with the same key.

## Installation

No installation is required for this module since it will be run using `npx`.

```sh
npx extend-env-files
```

## Usage

To use this module, set the `ENV_FILES_CONFIG` environment variable with a JSON configuration. The JSON keys are file paths, and the values are `.env` strings containing key-value pairs. When you run the module, it will:

1. Check if the target directory and file exist.
2. Merge the new key-value pairs with any existing content in the file.
3. Save the modified content back to the file.

### Example

```sh
export ENV_FILES_CONFIG='{"./config/.env": "KEY_A=1\nKEY_B=2", "./config/.env.local": "KEY_C=3"}'
npx extend-env-files
```

In the example above:
- The file `./config/.env` will be updated with `KEY_A=1` and `KEY_B=2`.
- The file `./config/.env.local` will be updated with `KEY_C=3`.

### Logging

To enable logging, set the `DEBUG` environment variable to any non-empty value:

```sh
DEBUG=1 npx extend-env-files
```

This will output logs such as the parsed configuration, the original and new content of each file, and other information about the execution process.

## Configuration

The configuration for `ENV_FILES_CONFIG` must be provided as a valid JSON object where:

- **Key**: The path of the file you want to update (relative or absolute).
- **Value**: A string containing `.env` key-value pairs.

Example `ENV_FILES_CONFIG` value:

```json
{
  "./config/.env": "KEY_A=1\nKEY_B=2",
  "./config/.env.local": "KEY_C=3"
}
```

This will ensure that `KEY_A` and `KEY_B` are added to `./config/.env`, and `KEY_C` is added to `./config/.env.local`.

## License

This project is licensed under the MIT License.