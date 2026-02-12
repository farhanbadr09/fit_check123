import React from 'react';
import { X, Download, Printer } from 'lucide-react';

const DiamondIcon = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2L15.5 8.5L22 12L15.5 15.5L12 22L8.5 15.5L2 12L8.5 8.5L12 2Z" />
    </svg>
);

const InvoiceModal = ({ isOpen, onClose, invoice }) => {
    if (!isOpen || !invoice) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in print:bg-white print:p-0">
            <div className="bg-white w-full max-w-[800px] rounded-[24px] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col relative animate-scale-in print:shadow-none print:max-h-none print:rounded-none">

                {/* Modal Controls (Hidden in Print) */}
                <div className="flex items-center justify-end p-4 border-b border-gray-50 print:hidden bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="p-2 hover:bg-white rounded-xl transition-all text-gray-500 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-200"
                            title="Print"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-xl transition-all text-gray-500 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-200" title="Download">
                            <Download className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-gray-200 mx-1" />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-red-50 rounded-xl transition-all text-gray-400 hover:text-red-500"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Invoice Content */}
                <div className="flex-1 overflow-y-auto p-12 bg-white print:p-0">
                    <div className="max-w-[650px] mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex items-center gap-3">
                                <DiamondIcon className="w-10 h-10 text-primary" />
                                <span className="text-3xl font-bold text-[#1e1b4b] tracking-tight">LookCheck</span>
                            </div>
                            <div className="text-right">
                                <h1 className="text-4xl font-bold text-[#1e1b4b] tracking-tighter mb-0">INVOICE</h1>
                                <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase">LC-{invoice.id.split('-').pop()}</p>
                                <p className="text-gray-600 text-xs font-bold mt-1">Date: {new Date(invoice.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-sm font-bold text-gray-500 mb-2">API Usage Invoice</p>
                            <div className="h-[1.5px] bg-primary/30 w-full" />
                        </div>

                        {/* Bill To & Subscription */}
                        <div className="grid grid-cols-2 gap-12 mb-12">
                            <div>
                                <h4 className="text-[11px] font-black text-primary uppercase tracking-widest mb-4">BILL TO</h4>
                                <p className="text-base font-bold text-gray-900 mb-1">{invoice.user}</p>
                                <p className="text-sm font-medium text-gray-500">{invoice.email}</p>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-black text-primary uppercase tracking-widest mb-4">SUBSCRIPTION DETAILS</h4>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-sm font-bold text-gray-500">Package:</span>
                                    <span className="text-sm font-bold text-gray-900">{invoice.package}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-500">Period:</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {new Date(invoice.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Usage Summary */}
                        <div className="bg-[#f8f9fc] rounded-[20px] p-8 mb-6 border border-gray-100/50">
                            <h4 className="text-lg font-bold text-primary mb-6">Usage Summary</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-400">Total Requests:</span>
                                    <span className="text-base font-bold text-gray-900">1</span>
                                </div>
                                <div className="h-px bg-gray-200/60" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-400">Request Limit:</span>
                                    <span className="text-base font-bold text-gray-900">10,000</span>
                                </div>
                                <div className="h-px bg-gray-200/60" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-900">Remaining Requests:</span>
                                    <span className="text-base font-bold text-gray-900 font-bold">9,999</span>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-[#f8f9fc] rounded-[20px] p-8 mb-16 border border-gray-100/50">
                            <h4 className="text-lg font-bold text-primary mb-6">Bank Details</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-400">Bank Name:</span>
                                    <span className="text-sm font-bold text-gray-900">Sample Bank</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-400">Account Number:</span>
                                    <span className="text-sm font-bold text-gray-900">1234567890</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-400">Bank Code:</span>
                                    <span className="text-sm font-bold text-gray-900">SB001</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                            <div className="h-px bg-gray-100 w-full mb-8" />
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                This is an automated invoice generated by LookCheck
                            </p>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                For Support, info at <span className="text-primary/70">info@rendream.com</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
