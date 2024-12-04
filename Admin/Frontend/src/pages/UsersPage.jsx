import Header from "../components/common/Header";
import Users from "../components/Users/Users";

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="إضافة فعالية جديدة" />
      <main className="max-w-3xl mx-auto py-6 px-4 lg:px-8">
        <Users />
      </main>
    </div>
  );
};

export default UsersPage;
