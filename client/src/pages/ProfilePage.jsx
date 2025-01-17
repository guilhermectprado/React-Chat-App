import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, Camera } from "lucide-react";
import { formatDateToProfile } from "../lib/timeConverter";

function ProfilePage() {
  const { authUser, isUpdatingProfileImage, updateProfileImage } =
    useAuthStore();

  const [selectedImage, setSelectImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectImage(base64Image);
      await updateProfileImage({ profileImage: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <h1 className="text-center text-2xl font-semibold">Profile</h1>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profileImage || "/avatar.png"}
                alt="Foto Perfil"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfileImage
                    ? "animate-pulse pointer-events-none"
                    : ""
                }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfileImage}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfileImage
                ? "Atualizando foto..."
                : "Clique na Câmera Para Atualizar a Foto"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                Nome
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6">
            <div className="text-lg font-medium">Informações da Conta</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Membro desde</span>
                <span className="text-green-500">
                  {/* {authUser.createdAt?.split("T")[0]} */}
                  {formatDateToProfile(authUser.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <span>Status da Conta</span>
                <span className="text-green-500">Ativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
