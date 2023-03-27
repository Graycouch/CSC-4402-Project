import { useGlobalState } from '../../globalValues';
import './Favorites.css'

export default function Favorites() {
    const [user] = useGlobalState("user");

    return (
        <div className="Favorites">
            <h1 style={{ textAlign: 'center' }}>
                Favorites
            </h1>
        </div>
    )
}
