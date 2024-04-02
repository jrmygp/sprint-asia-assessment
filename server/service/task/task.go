package task

import (
	"server/model"
	request "server/request/task"
)

type Service interface {
	FindAll() ([]model.Task, error)
	CreateNew(task request.CreateTaskRequest) (model.Task, error)
}
