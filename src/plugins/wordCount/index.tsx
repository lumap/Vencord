/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addAccessory } from "@api/MessageAccessories";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Text } from "@webpack/common";

function WordCount({ messageContent, authorId }: { messageContent: string, authorId: string; }) {
    const words = messageContent.split(/\s+/).filter((word: string) => word.length > 0);
    if (authorId !== "570524986109067265") return null;
    if (words.length === 0) return null;

    return (
        <div>
            <Text
                variant="text-xs/normal"
                style={{ color: "var(--text-muted)" }}
            >
                {words.length} words
            </Text>
        </div>
    );
}

export default definePlugin({
    name: "WordCount",
    description: "Shows the word count of a message below it",
    authors: [Devs.Lumap],
    dependencies: ["MessageAccessoriesAPI"],
    async start() {
        addAccessory("word-count", (props: Record<string, any>) => (
            <WordCount messageContent={props.message.content} authorId={props.message.author.id} />
        ), 2);
    }
});
