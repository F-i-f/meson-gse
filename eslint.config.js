// SPDX-FileCopyrightText: 2025 Florian Müllner <fmuellner@gnome.org>
// SPDX-License-Identifier: MIT OR LGPL-2.0-or-later

import {defineConfig} from '@eslint/config-helpers';
import gnome from 'eslint-config-gnome';

export default defineConfig([
    gnome.configs.recommended,
    gnome.configs.jsdoc,
    {
        rules: {
            camelcase: ['error', {
                properties: 'never',
            }],
            'consistent-return': 'error',
            'eqeqeq': ['error', 'smart'],
            'key-spacing': ['error', {
                mode: 'minimum',
                beforeColon: false,
                afterColon: true,
            }],
            'prefer-arrow-callback': 'error',
            'prefer-const': ['error', {
                destructuring: 'all',
            }],
            'jsdoc/require-param-description': 'off',
            'jsdoc/require-jsdoc': ['error', {
                exemptEmptyFunctions: true,
                publicOnly: {
                    esm: true,
                },
            }],
            // Pulled from node_modules/eslint-config-gnome/src/configs/gnome-recommended.js and added caughtErrorsIgnorePattern rule
            'no-unused-vars': ['error', {
                // Vars use a suffix _ instead of a prefix because of file-scope private vars
                varsIgnorePattern: '(^unused|_$)',
                argsIgnorePattern: '^(unused|_)',
                caughtErrorsIgnorePattern: '^(unused|_)',
            }],
        },
        languageOptions: {
            globals: {
                global: 'readonly',
            },
        },
    },
]);
