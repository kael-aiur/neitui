import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  List, 
  PlusCircle, 
  Building, 
  Users, 
  FileText, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight
} from 'lucide-react';
import { ReferrerTab, MOCK_JOBS } from '../types';
import { generateJobDescription } from '../services/geminiService';

const ReferrerPage: React.FC = () => {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState<ReferrerTab>(ReferrerTab.DASHBOARD);
  
  // Create Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobSkills, setJobSkills] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // User Info (Mock)
  const userCompany = "ByteDance";
  const userRole = "Senior Engineer";
  const userStats = {
    referrals: 24,
    interviews: 8,
    offers: 3
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateAI = async () => {
    if (!jobTitle) return;
    setIsGenerating(true);
    const desc = await generateJobDescription(jobTitle, userCompany, jobSkills);
    setGeneratedDescription(desc);
    setIsGenerating(false);
  };

  // --- Render Functions ---

  const renderLogin = () => (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">内推官登录</h2>
          <p className="mt-2 text-sm text-gray-600">
            请使用您的企业邮箱验证员工身份
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                企业邮箱
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg shadow-blue-200`}
            >
              {isLoading ? '验证中...' : '登录 / 注册'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
            <a href="#" className="hover:text-blue-600">忘记密码?</a>
            <a href="#" className="hover:text-blue-600">申请企业入驻</a>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (activeTab) {
      case ReferrerTab.DASHBOARD:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">数据概览</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+2 本周</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{userStats.referrals}</div>
                <div className="text-gray-500 text-sm">累计内推人数</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{userStats.interviews}</div>
                <div className="text-gray-500 text-sm">进入面试</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{userStats.offers}</div>
                <div className="text-gray-500 text-sm">成功入职 (Offer)</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-8">
              <h3 className="font-semibold text-lg mb-4">最近内推动态</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        U{i}
                      </div>
                      <div>
                        <div className="font-medium text-sm">User_{i}0{i} 投递了 {MOCK_JOBS[i-1]?.title}</div>
                        <div className="text-xs text-gray-400">2 小时前</div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">简历筛选中</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case ReferrerTab.MY_POSTS:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">我的岗位列表</h2>
              <button 
                onClick={() => setActiveTab(ReferrerTab.CREATE_POST)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                发布新岗位
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">职位名称</th>
                    <th className="px-6 py-4">薪资范围</th>
                    <th className="px-6 py-4">发布时间</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MOCK_JOBS.filter(j => j.company === userCompany).map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                      <td className="px-6 py-4 text-gray-500">{job.salary}</td>
                      <td className="px-6 py-4 text-gray-500">{job.postedAt}</td>
                      <td className="px-6 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">招聘中</span></td>
                      <td className="px-6 py-4 text-blue-600 cursor-pointer hover:underline">编辑</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case ReferrerTab.CREATE_POST:
        return (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">发布新内推岗位</h2>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">职位名称</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g. Senior Backend Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">核心技能 (用于 AI 生成描述)</label>
                <input 
                  type="text" 
                  value={jobSkills}
                  onChange={(e) => setJobSkills(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g. Java, Spring Boot, MySQL, High Concurrency"
                />
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">职位描述</label>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={isGenerating || !jobTitle}
                    className={`flex items-center text-xs px-3 py-1.5 rounded-full border transition-all ${
                      isGenerating 
                      ? 'bg-gray-100 text-gray-400 border-gray-200' 
                      : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isGenerating ? 'AI 正在思考...' : 'AI 自动生成'}
                  </button>
                </div>
                <textarea 
                  rows={8}
                  value={generatedDescription}
                  onChange={(e) => setGeneratedDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                  placeholder={isGenerating ? "正在为您撰写专业的职位描述..." : "输入职位名称并点击右上角 AI 生成，或手动输入..."}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">薪资范围</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" placeholder="e.g. 30k-50k" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">工作地点</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none" placeholder="e.g. Beijing" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-4">
                <button onClick={() => setActiveTab(ReferrerTab.MY_POSTS)} className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  取消
                </button>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  立即发布
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Select a tab</div>;
    }
  };

  if (!isLoggedIn) {
    return renderLogin();
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                ME
              </div>
              <div>
                <div className="font-bold text-gray-900">Alex Chen</div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Building className="w-3 h-3 mr-1" /> {userCompany}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab(ReferrerTab.DASHBOARD)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === ReferrerTab.DASHBOARD ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center"><LayoutDashboard className="w-4 h-4 mr-3" /> 数据概览</div>
                {activeTab === ReferrerTab.DASHBOARD && <ChevronRight className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setActiveTab(ReferrerTab.MY_POSTS)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === ReferrerTab.MY_POSTS ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center"><List className="w-4 h-4 mr-3" /> 岗位列表</div>
                {activeTab === ReferrerTab.MY_POSTS && <ChevronRight className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setActiveTab(ReferrerTab.CREATE_POST)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === ReferrerTab.CREATE_POST ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center"><PlusCircle className="w-4 h-4 mr-3" /> 新建内推</div>
                {activeTab === ReferrerTab.CREATE_POST && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
            
             <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-full mt-4 flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                退出登录
              </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default ReferrerPage;