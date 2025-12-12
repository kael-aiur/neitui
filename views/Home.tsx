import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Zap } from 'lucide-react';
import JobCard from '../components/JobCard';
import { MOCK_JOBS } from '../types';

const Home: React.FC = () => {
  const hotJobs = MOCK_JOBS.slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            连接顶尖人才 <br/> 与优质企业
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            通过内部推荐，让你的简历直达 Hiring Manager，<br/>提高 3 倍面试机会。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/seeker" className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg">
              浏览热招岗位
            </Link>
            <Link to="/referrer" className="w-full sm:w-auto px-8 py-3.5 bg-blue-500 bg-opacity-30 border border-blue-400 text-white font-bold rounded-full hover:bg-opacity-40 transition-colors backdrop-blur-sm">
              发布内推机会
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Jobs Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">热门内推</h2>
          </div>
          <Link to="/seeker" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group">
            查看更多 
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-500">认证内推官</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-gray-500">简历响应率</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2">3 天</div>
              <div className="text-gray-500">平均约面时间</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;