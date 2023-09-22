import { useEffect } from "react";

import { FiLogOut } from "react-icons/fi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
	FaFileCirclePlus,
	FaFilePen,
	FaUserGear,
	FaUserPlus,
} from "react-icons/fa6";
// import { FaFileCirclePlus } from "react-icons/fa";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
import useAuth from "../hooks/useAuth";

const DashHeader = () => {
	const { isManager, isAdmin } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate("/");
	}, [isSuccess, navigate]);

	const onNewNoteClicked = () => navigate("/dash/notes/new");
	const onNewUserClicked = () => navigate("/dash/users/new");
	const onNotesClicked = () => navigate("/dash/notes");
	const onUsersClicked = () => navigate("/dash/users");
	// if (isLoading) return <p>Logging Out...</p>;

	// if (isError) return <p>Error: {error.data?.message}</p>;

	let dashClass = null;
	if (
		!DASH_REGEX.test(pathname) &&
		!NOTES_REGEX.test(pathname) &&
		!USERS_REGEX.test(pathname)
	) {
		dashClass = "dash-header__container--small";
	}

	let newNoteButton = null;
	if (NOTES_REGEX.test(pathname)) {
		newNoteButton = (
			<button
				className="icon-button"
				title="New Note"
				onClick={onNewNoteClicked}
			>
				<FaFileCirclePlus />
			</button>
		);
	}

	let newUserButton = null;
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<button
				className="icon-button"
				title="New User"
				onClick={onNewUserClicked}
			>
				<FaUserPlus />
			</button>
		);
	}

	let userButton = null;
	if (isManager || isAdmin) {
		if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
			userButton = (
				<button
					className="icon-button"
					title="Users"
					onClick={onUsersClicked}
				>
					<FaUserGear />
				</button>
			);
		}
	}

	let notesButton = null;
	if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
		notesButton = (
			<button
				className="icon-button"
				title="Notes"
				onClick={onNotesClicked}
			>
				<FaFilePen />
			</button>
		);
	}
	const logoutButton = (
		<button
			className="icon-button"
			title="Logout"
			onClick={sendLogout}
		>
			<FiLogOut />
		</button>
	);

	const errClass = isError ? "errmsg" : "offscreen";

	let buttonContent;
	if (isLoading) {
		buttonContent = <p>Logging Out...</p>;
	} else {
		buttonContent = (
			<>
				{newNoteButton}
				{newUserButton}
				{notesButton}
				{userButton}
				{logoutButton}
			</>
		);
	}

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>

			<header className="dash-header">
				<div className={`dash-header__container ${dashClass}`}>
					<Link to="/dash">
						<h1 className="dash-header__title">techNotes</h1>
					</Link>
					<nav className="dash-header__nav">{buttonContent}</nav>
				</div>
			</header>
		</>
	);

	return content;
};
export default DashHeader;
