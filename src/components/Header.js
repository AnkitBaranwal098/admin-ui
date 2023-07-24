import React from 'react'
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
const Header = () => {
    return (
        <nav>
            <div>
                <AdminPanelSettingsSharpIcon/>
                AdminUI
            </div>
            <div>
                <button>
                    Toggle
                </button>
            </div>
        </nav>
    )
}

export default Header