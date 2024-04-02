package task

import "server/model"

type Repository interface {
	FindAll() ([]model.Task, error)
	CreateNew(task model.Task) (model.Task, error)
}
