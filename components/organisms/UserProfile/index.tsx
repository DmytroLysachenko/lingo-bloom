import { User } from "@/types";
import Image from "next/image";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Image
          src={user.image}
          alt={user.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-primary-700">
            {user.name}
          </h2>
          <p className="text-primary-600">{user.email}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-primary-500">
        Member since: {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserProfile;
