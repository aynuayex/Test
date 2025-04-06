export default function About() {
  return (
    <div className="flex flex-col md:gap-y-10 text-white">
      <div className="md:text-3xl font-bold tracking-tight">
        <span id="typewriter-text">
          Team information management system
        </span>
      </div>
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:justify-around font-semibold ">
        <div className="">
          <img src="team.svg" className="text-white" alt="Team" width={350} height={100} />
        </div>
        <div className="md:w-3/5 bg-white/10 backdrop-blur-md px-6 py-10 rounded-lg">
          <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <footer className="mt-15 px-4 text-center">
        <small className="mb-2 block text-xs">
          &copy; 2025 Ayne Abreham Alemayehu. All rights reserved.
        </small>
        <p className="text-xs">
          <span className="font-semibold">About this website:</span> built with
          React, TypeScript, Tailwind CSS, Shadcn-ui, React-Router
        </p>
      </footer>
    </div>
  );
}
