/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { UserStore } from "@webpack/common";

const settings = definePluginSettings({
    playSoundOnEveryReply: {
        type: OptionType.BOOLEAN,
        description: "Play a sound on every reply of yours, even if @mention is off",
        default: false
    }
});

export default definePlugin({
    name: "SameChannelMentionsNotifications",
    description: "Filters the \"Enable same-channel mentions notifications\" setting to only fire if you're mentioned",
    authors: [Devs.Lumap],

    settings: settings,

    patches: [
        {
            find: ".getNotifyMessagesInSelectedChannel()&&",
            replacement: {
                match: /MESSAGE_CREATE:function\((\S)\){.+?(?=getNotifyMessagesInSelectedChannel)getNotifyMessagesInSelectedChannel\(\)&&/,
                replace: "$&$self.isUserMentioned($1)&&"
            }
        }
    ],

    isUserMentioned(msg: any) {
        if (settings.store.playSoundOnEveryReply && (msg.message?.referenced_message?.author?.id === UserStore.getCurrentUser().id)) return true;
        return msg.message?.mentions?.some((mention: any) => mention.id === UserStore.getCurrentUser().id);
    }
});
