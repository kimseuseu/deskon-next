"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

const serviceLabel: Record<string, string> = {
  subscribe: "구독",
  sharing: "공유",
  rental: "렌탈",
  recycle: "순환",
  buyback: "매입",
};

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, isOpen, setIsOpen } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="font-paperlogy font-bold text-xl text-primary">
                  견적 목록
                </h2>
                {totalItems > 0 && (
                  <span className="bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-surface hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg
                    className="w-16 h-16 text-gray-200 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <p className="text-muted font-medium mb-2">
                    견적 목록이 비어있습니다
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="text-accent hover:text-accent-light text-sm underline transition-colors"
                  >
                    상품 둘러보기
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="bg-surface rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-paperlogy font-bold text-primary text-sm truncate">
                            {item.productName}
                          </h4>
                          <span className="inline-block mt-1 text-xs bg-accent/10 text-accent font-medium px-2 py-0.5 rounded">
                            {serviceLabel[item.serviceType] ?? item.serviceType}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-2 w-7 h-7 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
                        >
                          <svg
                            className="w-4 h-4 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-100 flex items-center justify-center transition-colors text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-100 flex items-center justify-center transition-colors text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">총 품목 수</span>
                  <span className="font-paperlogy font-bold text-primary">
                    {totalItems}개
                  </span>
                </div>
                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-accent hover:bg-accent-light text-white font-paperlogy font-bold text-center py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  견적 요청하기
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
