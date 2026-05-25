export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/300"
            alt="profile"
            className="w-32 h-32 rounded-full mb-6 border-4 border-red-600"
          />

          <h1 className="text-3xl font-bold mb-2">
            Usuario Netflix
          </h1>

          <p className="text-zinc-400 mb-8">
            usuario@email.com
          </p>

          <button className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-bold">
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
}