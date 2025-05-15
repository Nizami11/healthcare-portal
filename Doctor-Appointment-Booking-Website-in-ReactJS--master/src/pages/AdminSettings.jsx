const AdminSettings = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">System Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input type="text" className="mt-1 block w-full border rounded-md p-2" defaultValue="MediConnect" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Email</label>
              <input type="email" className="mt-1 block w-full border rounded-md p-2" defaultValue="admin@mediconnect.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
