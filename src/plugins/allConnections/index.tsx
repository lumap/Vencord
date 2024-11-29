/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "AllConnections",
    description: "Enables all existing connections",
    authors: [Devs.Kvba],

    patches: [
        { // show all connections
            find: "getPlatformUserUrl:",
            replacement: {
                match: /enabled:!1/g,
                replace: "enabled:!0"
            }
        }
    ],

});
