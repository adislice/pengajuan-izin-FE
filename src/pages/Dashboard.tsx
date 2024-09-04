import { useAuth } from "@/context/AuthProvider"
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { getDashboard } from "@/services/dashboardService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface DashboardStat {
  user_count: number,
  izin_count: number
}

export default function Dashboard() {
  const [dashboardStat, setDashboardStat] = useState<DashboardStat>();
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  useDocumentTitle("Dashboard");

  const levelText = auth.user?.level === 0 ? 'admin' :
    auth.user?.level === 1 ? 'verifikator' :
      auth.user?.level === 2 ? 'user' : '';

  const izinText = auth.user?.level === 0 ? 'Izin Diajukan' :
    auth.user?.level === 1 ? 'Izin Perlu Tindakan' :
      auth.user?.level === 2 ? 'Izin Anda' : '';

  const userText = auth.user?.level === 0 ? 'User Terdaftar' :
    auth.user?.level === 1 ? 'User Perlu Verifikasi' : '';

  useEffect(() => {
    getDashboard().then(data => {
      setDashboardStat(data);
    });
  }, []);
  return (
    <div className="flex w-full mx-auto bg-gray-100">
      <div className="w-full md:w-4/5 flex flex-col px-6 py-6 md:px-10 md:py-8 mx-auto">
        <div className="flex">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="bg-white flex-1 p-4 rounded-lg shadow relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className="duoicon duoicon-approved text-blue-500 mb-2"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.586 2.1a2 2 0 012.7-.116l.128.117L15.314 4H18a2 2 0 011.994 1.85L20 6v2.686l1.9 1.9a2 2 0 01.116 2.701l-.117.127-1.9 1.9V18a2 2 0 01-1.85 1.995L18 20h-2.685l-1.9 1.9a2 2 0 01-2.701.116l-.127-.116-1.9-1.9H6a2 2 0 01-1.995-1.85L4 18v-2.686l-1.9-1.9a2 2 0 01-.116-2.701l.116-.127 1.9-1.9V6a2 2 0 011.85-1.994L6 4h2.686l1.9-1.9z"
                className="duoicon-secondary-layer"
                opacity="0.3"
              ></path>
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.079 8.983l-4.244 4.244-1.768-1.768a1 1 0 10-1.414 1.415l2.404 2.404a1.1 1.1 0 001.556 0l4.88-4.881a1 1 0 00-1.414-1.414z"
                className="duoicon-primary-layer"
              ></path>
            </svg>
            <div className="font-semibold">Selamat Datang</div>
            <p className="text-gray-500">{auth.user?.nama} <span>({levelText})</span></p>
          </div>

          {(auth.user?.level == 0 || auth.user?.level == 1) && (
            <Link to={'/user'} className="bg-white flex-1 p-4 rounded-lg shadow hover:ring-4 hover:ring-gray-200 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                className="duoicon duoicon-user text-green-400 mb-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 13c2.396 0 4.575.694 6.178 1.671.8.49 1.484 1.065 1.978 1.69.486.616.844 1.352.844 2.139 0 .845-.411 1.511-1.003 1.986-.56.45-1.299.748-2.084.956-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139.494-.625 1.177-1.2 1.978-1.69C7.425 13.694 9.605 13 12 13z"
                  className="duoicon-primary-layer"
                ></path>
                <path
                  fill="currentColor"
                  d="M12 2c3.849 0 6.255 4.167 4.33 7.5A5 5 0 0112 12c-3.849 0-6.255-4.167-4.33-7.5A5 5 0 0112 2z"
                  className="duoicon-secondary-layer"
                  opacity="0.3"
                ></path>
              </svg>
              <div className="font-semibold">{userText}</div>
              <p className="text-gray-500">{dashboardStat?.user_count ?? '0'}</p>
            </Link>
          )}

          <Link to={'/izin'} className="bg-white flex-1 p-4 rounded-lg shadow hover:ring-4 hover:ring-gray-200 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className="duoicon duoicon-clipboard text-yellow-500 mb-2"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 3v1a2 2 0 002 2h6a2 2 0 002-2V3h1a2 2 0 012 2v11a6 6 0 01-6 6H6a2 2 0 01-2-2V5a2 2 0 012-2h1z"
                className="duoicon-secondary-layer"
                opacity="0.3"
              ></path>
              <path
                fill="currentColor"
                d="M14 2a1 1 0 01.117 1.993L14 4h-4a1 1 0 01-.117-1.993L10 2h4zm1 8H9a1 1 0 00-.117 1.993L9 12h6a1 1 0 100-2zm-3 4H9a1 1 0 100 2h3a1 1 0 100-2z"
                className="duoicon-primary-layer"
              ></path>
            </svg>
            <div className="font-semibold">{izinText}</div>
            <p className="text-gray-500">{dashboardStat?.izin_count ?? '0'}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}