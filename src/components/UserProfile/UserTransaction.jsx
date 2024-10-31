import Image from 'next/image';
import React from 'react';
import masterCard from '@/image/icon/mastercard.jpg';
import visa from '@/image/icon/visa.png';

const UserTransaction = ({ transactions }) => {
    const sortedTrans = transactions?.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="mt-6 overflow-x-auto rounded-xl bg-white dark:bg-[#181024] px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b  dark:border-[#3e1878c2] lg:table-header-group">
            <tr>
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-500 dark:text-white sm:px-3">Order Date</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-white sm:px-3">Transaction ID</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-white sm:px-3">Email</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-white sm:px-3">Package</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-white sm:px-3">Method</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-white sm:px-3">Price</td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-white sm:px-3">Status</td>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-[#181024] dark:border-[#3e1878c2] lg:border-gray-300">
            {
              transactions?.map((item, id) => (
                <tr className="" key={item._id}>
                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 dark:text-white sm:px-3 lg:text-left">
                    {/* Format the date to show only the date without time */}
                    {new Date(item?.startDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                      <div className="flex items-center">{item?.transactionId ? item?.transactionId : 'N/A'}</div>
                      <div className="">{item.email}</div>
                      <div className="flex items-center">{item.plan}</div>
                      <div className="flex items-center">{item.paymentMethod}</div>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 dark:text-white sm:px-3 lg:table-cell">
                    {item?.transactionId ? item?.transactionId : 'N/A'}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 dark:text-white sm:px-3 lg:table-cell">
                    {item.email}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 dark:text-white sm:px-3 lg:table-cell">
                    {item.plan}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 dark:text-white sm:px-3 lg:table-cell lg:text-left">
                    {item.paymentMethod === 'card' && id % 2 === 0 ? (
                      <Image className="w-[28px] rounded" alt="Visa" src={visa} height={60} width={60} />
                    ) : (
                      <Image className="w-[28px] rounded" alt="MasterCard" src={masterCard} height={60} width={60} />
                    )}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-right text-sm sm:px-3 lg:text-left lg:font-normal font-medium">
                    ${item.amount}
                  </td>
                  <td
                    className={`whitespace-no-wrap py-4 text-right text-sm sm:px-3 lg:text-left ${
                      item.status === 'failed'
                        ? 'text-yellow-600 font-semibold'
                        : item.status === 'pending'
                        ? 'text-yellow-600 font-semibold'
                        : item.status === 'paid'
                        ? 'text-green-600 font-semibold'
                        : 'text-gray-600'
                    }`}
                  >
                    <span
                      className={`${
                        item.status === 'paid' ? 'border-green-400 text-green-600 ' : 'border-yellow-400 text-yellow-600 '
                      } border py-1 px-2 rounded-lg capitalize`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
    );
};

export default UserTransaction;