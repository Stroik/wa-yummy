'use client';

import { useContext } from 'react';
import { LocaleContext } from './Providers';

export const LangSelector = () => {
  const { locale, setLocale } = useContext(LocaleContext);

  const handleLocaleChange = (selectedLocale: string) => {
    setLocale(selectedLocale);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm btn-ghost m-1">
        {locale}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-20"
      >
        <li onClick={() => handleLocaleChange('es')}>
          <a>ES</a>
        </li>
        <li onClick={() => handleLocaleChange('en')}>
          <a>EN</a>
        </li>
      </ul>
    </div>
  );
};
