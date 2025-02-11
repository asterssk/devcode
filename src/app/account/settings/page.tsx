import { Metadata } from "next";
import {
  updateBio,
  updateEmail,
  updateName,
  updatePassword,
  updateUsername,
} from "../_actions";
import { EditableLabelForm } from "@/components/ui/editable-label-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DeleteAccount } from "@/components/delete-account";
import { ChangePassword } from "@/components/change-password";
import { Label } from "@/components/ui/label";
import { socialProviders } from "@/lib/data/social-providers";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = { title: "Settings" };

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h2>Profile</h2>

        <div className="flex flex-col gap-4">
          <EditableLabelForm
            action={updateName}
            label="Display Name"
            value={session?.user.name}
          />

          <EditableLabelForm
            action={updateBio}
            label="Bio"
            placeholder="Update your bio..."
            value={session?.user.bio}
          />

          <div>Avatar</div>
          <div>Social Links</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Preferences</h2>

        <div>Push notifications</div>
        <div>Editor theme</div>
        <div>Languages</div>
      </div>

      <div className="flex flex-col gap-6">
        <h2>Logins</h2>

        <div className="flex flex-col gap-4">
          <EditableLabelForm
            action={updateEmail}
            label="Email Address"
            value={session?.user.email}
          />

          <EditableLabelForm
            action={updateUsername}
            label="Username"
            value={session?.user.username}
          />

          <div className="grid gap-1.5 justify-start">
            <Label className="text-xs text-muted-foreground">Password</Label>
            <ChangePassword />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Social Logins
            </Label>

            <div className="flex gap-2">
              {socialProviders
                .entries()
                .filter((e) => e[1].enabled)
                .toArray()
                .map(([key, social]) => (
                  <Button key={key} size="sm" variant="outline">
                    <Image
                      src={social.icon}
                      className="dark:invert"
                      width={17}
                      height={17}
                      quality={50}
                      alt={`connect ${key}`}
                    />
                    Connect {social.label}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col gap-2">
        <h2>Privacy</h2>

        <div>Allow people to follow you</div>
        <div>Who can send you messages</div>
        <div>Blocked accounts</div>
      </div> */}

      <div className="flex flex-col gap-2">
        <h2>Danger</h2>

        <DeleteAccount />

        <div>
          <h3>Delete account</h3>
          <p className="sr-only">
            Once you delete your account, your profile and username are
            permanently removed from Reddit and your posts, comments, and
            messages are disassociated (not deleted) from your account unless
            you delete them beforehand.
          </p>
        </div>
      </div>
    </div>
  );
}
