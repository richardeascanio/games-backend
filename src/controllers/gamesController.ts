import { Request, Response} from 'express';
import db from '../database'

class GamesController {

    public async list (req: Request, res: Response) {
        const games = await db.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params; //Destructuring (get just one param of an object)
        const games = await db.query('SELECT * FROM games WHERE id = ?', [id]);
        if(games.length > 0){
            return res.json(games[0]);
        }
        res.status(404).json({
            text: 'Game does not exist'
        });
        console.log(games);
    }

    public async create (req: Request, res: Response): Promise<void> {
        await db.query('INSERT INTO games set ?', [req.body]);
        res.json({
            message: 'Game saved'
        });
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({
            message: 'Game updated'
        })
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({
            message: 'Game deleted'
        });
    }
}

const gamesController = new GamesController();
export default gamesController;