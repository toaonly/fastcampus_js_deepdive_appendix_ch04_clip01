import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <div className="flex justify-center items-start w-full h-screen">
      <div className="flex flex-col h-full overflow-hidden divide-y divide-slate-600 w-[768px] pt-16 pb-16">
        <div className="py-4 text-center">
          <h2>할 일 관리하기</h2>
        </div>
        <div className="flex flex-1 px-8 py-4 overflow-hidden">
          <div className="flex-1 h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
