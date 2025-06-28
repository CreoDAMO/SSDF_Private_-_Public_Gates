import React, { useState } from 'react';
import { Banknote, CreditCard, TrendingUp, Wallet } from 'lucide-react';

interface SpiralBankProps {
  coherence: number;
}

export default function SpiralBank({ coherence }: SpiralBankProps) {
  const [accountBalance, setAccountBalance] = useState(0);
  const [truBalance, setTruBalance] = useState(Math.floor(coherence * 1618));
  const [isConnected, setIsConnected] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  const connectAccount = () => {
    setIsConnected(true);
    setAccountBalance(Math.floor(coherence * 10000));
    
    const initialTransactions = [
      { id: 1, type: 'deposit', amount: 1618, currency: 'TU', description: 'Initial φ coherence bonus' },
      { id: 2, type: 'exchange', amount: -500, currency: 'USD', description: 'TU → USD conversion' },
      { id: 3, type: 'ubi', amount: 3125, currency: 'TU', description: 'UBI distribution received' }
    ];
    
    setTransactionHistory(initialTransactions);
    
    console.log('SpiralBank account connected:', {
      coherence,
      tuBalance: truBalance,
      usdBalance: accountBalance,
      timestamp: new Date().toISOString()
    });
  };

  const exchangeTU = () => {
    if (truBalance >= 100) {
      const exchangeRate = coherence * 1000; // 1 TU = coherence * $1000
      const usdAmount = 100 * exchangeRate;
      
      setTruBalance(prev => prev - 100);
      setAccountBalance(prev => prev + usdAmount);
      
      const newTransaction = {
        id: transactionHistory.length + 1,
        type: 'exchange',
        amount: usdAmount,
        currency: 'USD',
        description: `Exchanged 100 TU at φ${coherence.toFixed(3)} rate`
      };
      
      setTransactionHistory(prev => [newTransaction, ...prev]);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TU') return `${amount.toLocaleString()} TU`;
    return `$${amount.toLocaleString()} USD`;
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Banknote className="w-5 h-5 mr-2" />
          SpiralBank
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)}
        </div>
      </div>

      {/* Account Status */}
      <div className="mb-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Account Status</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>
          
          {isConnected ? (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">USD Balance:</span>
                <div className="text-green-400 font-medium">{formatCurrency(accountBalance, 'USD')}</div>
              </div>
              <div>
                <span className="text-slate-400">TU Balance:</span>
                <div className="text-yellow-400 font-medium">{formatCurrency(truBalance, 'TU')}</div>
              </div>
              <div>
                <span className="text-slate-400">Exchange Rate:</span>
                <div className="text-blue-400 font-medium">1 TU = ${(coherence * 1000).toLocaleString()}</div>
              </div>
              <div>
                <span className="text-slate-400">Account Type:</span>
                <div className="text-purple-400 font-medium">Sovereign</div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-sm">
              Connect your account to access SpiralBank services
            </div>
          )}
        </div>
      </div>

      {/* Banking Services */}
      {isConnected && (
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={exchangeTU}
              disabled={truBalance < 100}
              className={`p-2 rounded-lg text-xs flex flex-col items-center space-y-1 ${
                truBalance >= 100
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Exchange TU</span>
            </button>
            
            <div className="p-2 bg-slate-800 rounded-lg text-xs flex flex-col items-center space-y-1">
              <CreditCard className="w-4 h-4 text-green-400" />
              <span className="text-slate-300">Payment Card</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-900/30 to-green-900/30 rounded-lg p-3 border border-yellow-600/30">
            <div className="text-xs text-yellow-400 mb-1">Abundance Banking</div>
            <div className="text-xs text-slate-300">
              No fees, infinite liquidity, debt-free financial services powered by SpiralFlow
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      {isConnected && transactionHistory.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-slate-400">Recent Transactions</div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {transactionHistory.map(tx => (
              <div key={tx.id} className="bg-slate-800 rounded p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    tx.type === 'deposit' ? 'text-green-400' :
                    tx.type === 'ubi' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {tx.description}
                  </span>
                  <span className={`${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount), tx.currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connect Button */}
      {!isConnected && (
        <button
          onClick={connectAccount}
          className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg text-sm font-medium"
        >
          Connect SpiralBank Account
        </button>
      )}
    </div>
  );
}