import { Link } from 'react-router-dom';
import {Mail, Phone} from 'lucide-react'
const candidates = [
  {
    initials: 'MA',
    name: 'Nguyễn Thu Huyền',
    status: 'Chưa xem',
    campaign: 'Chiến dịch tuyển Nhà ...',
    campaignId: '#408580',
    email: 'banglangtim@gmail.com',
    phone: '0946765876',
    insights: ['Ứng tuyển', '05/06/2023 14:38', 'Nhân viên kinh doanh'],
    statusLabel: 'CV tiếp nhận',
  },
  {
    initials: 'TT',
    name: 'Trần Đông Thành',
    status: 'Đã xem',
    campaign: 'Tuyển nhân viên kinh ...',
    campaignId: '#408583',
    email: 'thanh.td@gmail.com',
    phone: '0962636803',
    insights: ['Ứng tuyển', '01/06/2023 15:59'],
    statusLabel: 'CV tiếp nhận',
  },
  {
    initials: 'TT',
    name: 'Trần Thanh Tâm',
    status: 'Đã xem',
    campaign: 'Tuyển Tester',
    campaignId: '#408580',
    email: 'thanh.td@gmail.com',
    phone: '0962636803',
    insights: ['Ứng tuyển', '01/06/2023 15:59'],
    statusLabel: 'CV tiếp nhận',
  },
  {
    initials: 'BT',
    name: 'Phạm Quang Bình',
    status: 'Đã xem',
    campaign: 'Tuyển C&B',
    campaignId: '#408589',
    email: 'binhpham@gmail.net',
    phone: '0889245166',
    insights: ['Ứng tuyển', '01/06/2023 15:59'],
    statusLabel: 'CV tiếp nhận',
  },
];

const statusOptions = {
  'CV tiếp nhận': 'cv-received',
  'Phù hợp': 'suitable',
  'Hẹn phỏng vấn': 'interview',
  'Gửi đề nghị': 'offer-sent',
  'Nhận việc': 'hired',
  'Từ chối': 'rejected'
};

const Candidates = () => {
  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Quản lý CV ứng viên</h2>
        <input
          type="text"
          placeholder="Tìm kiếm tên, email, số điện thoại"
          className="border rounded px-2 py-1 text-sm w-[30%]"
        />
        <div className="space-x-2">
          <label  >Nhập trạng thái: </label>
          <select className="border rounded px-2 py-1 text-sm">
            
            {Object.keys(statusOptions).map((status) => (
              <option key={status} value={statusOptions[status]}>
                {status}
              </option>
            ))}
          </select>
          
        </div>
      </div>
      
      <div className="overflow-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Ứng viên</th>
              <th className="p-2 text-left">Chiến dịch</th>
              <th className="p-2 text-left">Thông tin liên hệ</th>
              <th className="p-2 text-left">Insights</th>
              <th className="p-2 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 flex items-center">
                  <div className={`w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-white font-bold mr-2`}>
                    {candidate.initials}
                  </div>
                  <div>
                    <p>{candidate.name}</p>
                    <p className="text-xs text-green-500">{candidate.status}</p>
                  </div>
                </td>
                <td className="p-2">
                  <p>{candidate.campaign}</p>
                  <p className="text-xs text-gray-500">{candidate.campaignId}</p>
                </td>
                <td className="p-2">
                    <div className="flex items-center mb-1">
                        <span className='text-primary mr-2'><Mail size={12}/></span>
                        <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center">
                        <span className='text-primary mr-2'><Phone size={12}/></span>
                        <span>{candidate.phone}</span>
                    </div>
                </td>

                <td className="p-2">
                  {candidate.insights.map((insight, i) => (
                    <p key={i}>{insight}</p>
                  ))}
                </td>
                <td className="p-2">
                <Link to ={"/cv-detail"}> 
                  <button className="text-blue-500 border border-blue-500 rounded px-2 py-1">
                    {candidate.statusLabel} 
                  </button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
