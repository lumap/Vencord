/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "ShowMoreTabs",
    description: "Shows some more tabs between the friends tab and your DMs",
    authors: [Devs.Lumap],

    patches: [
        {
            find: "hasLibraryApplication(){",
            replacement: {
                match: /hasLibraryApplication\(\)\{/,
                replace: "$&return true;"
            }
        },
        {
            find: ".getMessageRequestsCount()>0",
            all: true,
            replacement: {
                match: /r\.Z\.getMessageRequestsCount\(\)*>*0|e\.getMessageRequestsCount\(\)*>*0/g,
                replace: "true"
            }
        }
    ]
});
