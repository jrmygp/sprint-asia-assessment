package checklist

import "server/model"

type Repository interface {
	FindAllByTask(TaskID int) ([]model.Checklist, error)
}
