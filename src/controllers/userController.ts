import { Request, Response } from 'express';

class UserController {
  getAllUsers = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  getUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  createUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  updateUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  deleteUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };
}

export default UserController;
