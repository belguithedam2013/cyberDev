import React, { useState } from 'react';
import { Code, Shield, Key, Hash, Binary, Network, Lock, Eye, EyeOff, Copy, Check } from 'lucide-react';

const CyberDevToolkit = () => {
  const [activeTab, setActiveTab] = useState('encoder');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CyberDev Toolkit
            </h1>
          </div>
          <p className="text-gray-300">أدوات شاملة للمبرمجين ومتخصصي الأمن السيبراني</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 bg-gray-800/50 p-2 rounded-lg backdrop-blur">
          {[
            { id: 'encoder', label: 'التشفير', icon: Hash },
            { id: 'password', label: 'كلمات المرور', icon: Key },
            { id: 'json', label: 'JSON', icon: Code },
            { id: 'converter', label: 'تحويل الأنظمة', icon: Binary },
            { id: 'network', label: 'الشبكات', icon: Network }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-gray-800/30 backdrop-blur rounded-xl p-6 shadow-2xl border border-gray-700">
          {activeTab === 'encoder' && <EncoderTool copyToClipboard={copyToClipboard} copied={copied} />}
          {activeTab === 'password' && <PasswordTool copyToClipboard={copyToClipboard} copied={copied} />}
          {activeTab === 'json' && <JsonTool />}
          {activeTab === 'converter' && <ConverterTool />}
          {activeTab === 'network' && <NetworkTool />}
        </div>
      </div>
    </div>
  );
};

// Encoder Tool Component
const EncoderTool = ({ copyToClipboard, copied }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState('base64encode');

  const encode = (text, type) => {
    try {
      switch(type) {
        case 'base64encode':
          return btoa(unescape(encodeURIComponent(text)));
        case 'base64decode':
          return decodeURIComponent(escape(atob(text)));
        case 'urlencode':
          return encodeURIComponent(text);
        case 'urldecode':
          return decodeURIComponent(text);
        case 'hex':
          return text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
        default:
          return text;
      }
    } catch (e) {
      return 'خطأ في المعالجة: ' + e.message;
    }
  };

  const handleProcess = () => {
    setOutput(encode(input, method));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-400">
        <Hash className="w-6 h-6" />
        أدوات التشفير والترميز
      </h2>
      
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">اختر نوع العملية</label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="base64encode">Base64 Encode</option>
            <option value="base64decode">Base64 Decode</option>
            <option value="urlencode">URL Encode</option>
            <option value="urldecode">URL Decode</option>
            <option value="hex">Text to Hex</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">النص المدخل</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
            placeholder="أدخل النص هنا..."
          />
        </div>

        <button
          onClick={handleProcess}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          معالجة
        </button>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">النتيجة</label>
            {output && (
              <button
                onClick={() => copyToClipboard(output)}
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'تم النسخ!' : 'نسخ'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 font-mono text-sm text-green-400"
            placeholder="النتيجة ستظهر هنا..."
          />
        </div>
      </div>
    </div>
  );
};

// Password Tool Component
const PasswordTool = ({ copyToClipboard, copied }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [checkPassword, setCheckPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const checkStrength = (pass) => {
    setCheckPassword(pass);
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    const levels = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'قوية', 'قوية جداً'];
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-cyan-500'];
    setStrength({ level: levels[score], color: colors[score], score });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-400">
        <Key className="w-6 h-6" />
        أدوات كلمات المرور
      </h2>

      {/* Password Generator */}
      <div className="bg-gray-700/30 p-4 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold text-purple-400">مولد كلمات المرور</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">الطول: {length}</label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({...options, [key]: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="text-sm">
                {key === 'uppercase' && 'أحرف كبيرة (A-Z)'}
                {key === 'lowercase' && 'أحرف صغيرة (a-z)'}
                {key === 'numbers' && 'أرقام (0-9)'}
                {key === 'symbols' && 'رموز (!@#$)'}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          توليد كلمة مرور
        </button>

        {password && (
          <div className="relative">
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="flex-1 bg-transparent outline-none font-mono text-green-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={() => copyToClipboard(password)}
                className="text-cyan-400 hover:text-cyan-300"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password Strength Checker */}
      <div className="bg-gray-700/30 p-4 rounded-lg space-y-4">
        <h3 className="text-xl font-semibold text-cyan-400">فاحص قوة كلمة المرور</h3>
        
        <div>
          <input
            type="text"
            value={checkPassword}
            onChange={(e) => checkStrength(e.target.value)}
            placeholder="أدخل كلمة مرور للفحص..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {strength && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>القوة: <span className={`font-bold ${strength.color}`}>{strength.level}</span></span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${strength.color.replace('text', 'bg')}`}
                style={{ width: `${(strength.score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// JSON Tool Component
const JsonTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('JSON غير صالح: ' + e.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('JSON غير صالح: ' + e.message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-400">
        <Code className="w-6 h-6" />
        محلل ومنسق JSON
      </h2>

      <div>
        <label className="block text-sm font-medium mb-2">أدخل JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
          placeholder='{"name": "Ahmed", "role": "Developer"}'
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={formatJson}
          className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          تنسيق JSON
        </button>
        <button
          onClick={minifyJson}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          ضغط JSON
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg px-4 py-3 text-red-400">
          {error}
        </div>
      )}

      {output && (
        <div>
          <label className="block text-sm font-medium mb-2">النتيجة</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 font-mono text-sm text-green-400"
          />
        </div>
      )}
    </div>
  );
};

// Converter Tool Component
const ConverterTool = () => {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState('10');
  const [results, setResults] = useState(null);

  const convert = () => {
    try {
      const decimal = parseInt(input, parseInt(fromBase));
      setResults({
        binary: decimal.toString(2),
        octal: decimal.toString(8),
        decimal: decimal.toString(10),
        hex: decimal.toString(16).toUpperCase()
      });
    } catch (e) {
      setResults({ error: 'قيمة غير صالحة' });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-400">
        <Binary className="w-6 h-6" />
        محول الأنظمة العددية
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">النظام المدخل</label>
          <select
            value={fromBase}
            onChange={(e) => setFromBase(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="2">ثنائي (Binary)</option>
            <option value="8">ثماني (Octal)</option>
            <option value="10">عشري (Decimal)</option>
            <option value="16">سادس عشري (Hex)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">القيمة</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="أدخل القيمة..."
          />
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
      >
        تحويل
      </button>

      {results && !results.error && (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(results).map(([key, value]) => (
            <div key={key} className="bg-gray-700/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">
                {key === 'binary' && 'ثنائي (Binary)'}
                {key === 'octal' && 'ثماني (Octal)'}
                {key === 'decimal' && 'عشري (Decimal)'}
                {key === 'hex' && 'سادس عشري (Hex)'}
              </div>
              <div className="text-xl font-mono text-green-400">{value}</div>
            </div>
          ))}
        </div>
      )}

      {results && results.error && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg px-4 py-3 text-red-400">
          {results.error}
        </div>
      )}
    </div>
  );
};

// Network Tool Component
const NetworkTool = () => {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState('24');
  const [info, setInfo] = useState(null);

  const calculateNetwork = () => {
    try {
      const ipParts = ip.split('.').map(Number);
      const maskBits = parseInt(cidr);
      const mask = Array(4).fill(0).map((_, i) => {
        const bits = Math.max(0, Math.min(8, maskBits - i * 8));
        return (0xFF << (8 - bits)) & 0xFF;
      });

      const network = ipParts.map((part, i) => part & mask[i]);
      const broadcast = ipParts.map((part, i) => part | (~mask[i] & 0xFF));
      const hostCount = Math.pow(2, 32 - maskBits) - 2;

      setInfo({
        ip: ip,
        mask: mask.join('.'),
        cidr: `/${cidr}`,
        network: network.join('.'),
        broadcast: broadcast.join('.'),
        firstHost: network[0] + '.' + network[1] + '.' + network[2] + '.' + (network[3] + 1),
        lastHost: broadcast[0] + '.' + broadcast[1] + '.' + broadcast[2] + '.' + (broadcast[3] - 1),
        hostCount: hostCount > 0 ? hostCount : 0
      });
    } catch (e) {
      setInfo({ error: 'عنوان IP غير صالح' });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-400">
        <Network className="w-6 h-6" />
        حاسبة الشبكات (IP Calculator)
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">عنوان IP</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="192.168.1.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">CIDR (/{cidr})</label>
          <input
            type="range"
            min="0"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={calculateNetwork}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
      >
        حساب
      </button>

      {info && !info.error && (
        <div className="grid md:grid-cols-2 gap-3">
          {[
            ['عنوان IP', info.ip],
            ['قناع الشبكة', info.mask],
            ['CIDR', info.cidr],
            ['عنوان الشبكة', info.network],
            ['عنوان البث', info.broadcast],
            ['أول مضيف', info.firstHost],
            ['آخر مضيف', info.lastHost],
            ['عدد المضيفين', info.hostCount]
          ].map(([label, value]) => (
            <div key={label} className="bg-gray-700/30 p-3 rounded-lg">
              <div className="text-sm text-gray-400">{label}</div>
              <div className="text-lg font-mono text-green-400">{value}</div>
            </div>
          ))}
        </div>
      )}

      {info && info.error && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg px-4 py-3 text-red-400">
          {info.error}
        </div>
      )}
    </div>
  );
};

export default CyberDevToolkit;