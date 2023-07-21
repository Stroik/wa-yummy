'use client';

import { useContext } from 'react';
import { ThemeContext } from './Providers';
export const ThemeSelector = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3" tabIndex={0}>
      <button
        onClick={() => setTheme('light')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="light"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="light"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">light</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="dark"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="dark"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">dark</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('cupcake')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="cupcake"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="cupcake"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">cupcake</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('bumblebee')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="bumblebee"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="bumblebee"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">bumblebee</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('emerald')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="emerald"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="emerald"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">emerald</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('corporate')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="corporate"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="corporate"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">corporate</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('synthwave')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="synthwave"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="synthwave"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">synthwave</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('retro')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="retro"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="retro"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">retro</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('cyberpunk')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="cyberpunk"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="cyberpunk"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">cyberpunk</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('valentine')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="valentine"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="valentine"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">valentine</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('halloween')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="halloween"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="halloween"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">halloween</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('garden')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="garden"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="garden"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">garden</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('forest')}
        className="outline-base-content overflow-hidden rounded-lg text-left [&amp;_svg]:visible"
        data-set-theme="forest"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="forest"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">forest</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('aqua')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="aqua"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="aqua"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">aqua</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('lofi')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="lofi"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="lofi"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">lofi</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('pastel')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="pastel"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="pastel"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">pastel</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('fantasy')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="fantasy"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="fantasy"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">fantasy</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('wireframe')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="wireframe"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="wireframe"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">wireframe</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('black')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="black"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="black"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">black</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('luxury')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="luxury"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="luxury"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">luxury</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('dracula')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="dracula"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="dracula"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">dracula</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('cmyk')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="cmyk"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="cmyk"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">cmyk</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('autumn')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="autumn"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="autumn"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">autumn</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('business')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="business"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="business"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">business</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('acid')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="acid"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="acid"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">acid</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('lemonade')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="lemonade"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="lemonade"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">lemonade</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('night')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="night"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="night"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">night</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('coffee')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="coffee"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="coffee"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">coffee</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => setTheme('winter')}
        className="outline-base-content overflow-hidden rounded-lg text-left"
        data-set-theme="winter"
        data-act-class="[&amp;_svg]:visible"
      >
        <div
          data-theme="winter"
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{' '}
              <div className="flex-grow text-sm">winter</div>{' '}
              <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                <div className="bg-primary w-2 rounded"></div>{' '}
                <div className="bg-secondary w-2 rounded"></div>{' '}
                <div className="bg-accent w-2 rounded"></div>{' '}
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>{' '}
    </div>
  );
};
