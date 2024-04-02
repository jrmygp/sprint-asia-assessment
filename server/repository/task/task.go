package task

import "server/model"

type Repository interface {
	FindAll() ([]model.Task, error)
	FindByID(ID int) (model.Task, error)
	CreateNew(task model.Task) (model.Task, error)
	Update(task model.Task) (model.Task, error)
	Delete(task model.Task) (model.Task, error)
}
