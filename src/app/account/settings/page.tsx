import { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2>Profile</h2>

        <div>Display Name</div>
        <div>Bio</div>
        <div>Avatar</div>
        <div>Social Links</div>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Preferences</h2>

        <div>Push notifications</div>
        <div>Editor theme</div>
        <div>Languages</div>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Logins</h2>

        <div>Email</div>
        <div>Password</div>
        <div>Github</div>
        <div>Google</div>
        <div>Facebook</div>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Privacy</h2>

        <div>Allow people to follow you</div>
        <div>Who can send you messages</div>
        <div>Blocked accounts</div>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Danger</h2>

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
