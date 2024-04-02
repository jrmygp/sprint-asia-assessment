package task

import "server/model"

type Service interface {
	FindAll() ([]model.Task, error)
}
