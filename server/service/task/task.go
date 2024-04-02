package task

import (
	"server/model"
	request "server/request/task"
)

type Service interface {
	FindAll() ([]model.Task, error)
	FindByID(ID int) (model.Task, error)
	CreateNew(task request.CreateTaskRequest) (model.Task, error)
	Update(ID int, task request.UpdateTaskRequest) (model.Task, error)
	Delete(ID int) (model.Task, error)
}
