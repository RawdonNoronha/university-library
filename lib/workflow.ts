import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "./config";

export const worflowClient = new WorkflowClient({
    baseUrl: process.env.UPSTASH_QSTASH_URL!,
    token: process.env.UPSTASH_QSTASH_TOKEN!,
});

const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({ email, subject, message }: { email: string, subject: string, message: string }) => {
    await qstashClient.publishJSON({
        api: {
            name: "email",
            provider: resend({ token: config.env.resendToken }),
        },
        body: {
            from: "Rawdon <onboarding@resend.dev>",
            to: [email],
            subject,
            html: message,
        },
    });

}

