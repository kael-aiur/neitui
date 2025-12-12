import React, { useState } from 'react';
import { Search, Building2, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';
import { MOCK_JOBS } from '../types';

const SeekerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');

  const companies = ['All', ...Array.from(new Set(MOCK_JOBS.map(j => j.company)))];

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCompany = selectedCompany === 'All' || job.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  // Group jobs by company for the view if no specific filter is active
  const jobsByCompany = companies.filter(c => c !== 'All').map(company => ({
    company,
    jobs: filteredJobs.filter(j => j.company === company)
  })).filter(group => group.jobs.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header & Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">发现好工作</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索职位名称、技能标签..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
              <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm bg-white appearance-none cursor-pointer"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                {companies.map(c => (
                  <option key={c} value={c}>{c === 'All' ? '全部公司' : c}</option>
                ))}
              </select>
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedCompany === 'All' && !searchTerm ? (
          // Grouped View (Default)
          <div className="space-y-10">
            {jobsByCompany.map((group) => (
              <section key={group.company} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
                   <img 
                    src={group.jobs[0].logo} 
                    alt={group.company} 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <h2 className="text-xl font-bold text-gray-900">{group.company}</h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {group.jobs.length} 个职位在招
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          // Flat List View (Filtered)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                没有找到符合条件的职位
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerPage;