import Header from "../components/common/Header";
import JoinRequests from "../components/JoinRequests/JoinRequests";

const JoinRequestsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="طلبات الانضمام" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <JoinRequests />
      </main>
    </div>
  );
};

export default JoinRequestsPage;
