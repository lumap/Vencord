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
        // {
        //     all: true,
        //     find: ".getMessageRequestsCount()>0",
        //     replacement: {
        //         match: /(\s|=)[a-zA-Z.]*getMessageRequestsCount\(\)>0/,
        //         replace: "$1 true"
        //     }
        // }
        {
            find: ".getSpamChannelsCount();",
            replacement: {
                match: /.isSpam\(\i\)}function \i\(\)\{/,
                replace: "$&return true;"
            }
        },
        {
            find: ".getSpamChannelsCount()>0",
            replacement: {
                match: /let (\S)=[\S.]{1,5}getMessage[^;]*;/,
                replace: "let $1=true;"
            }
        }
    ]
});
