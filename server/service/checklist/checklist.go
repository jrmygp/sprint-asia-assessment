package checklist

import "server/model"

type Service interface {
	FindAllByTask(TaskID int) ([]model.Checklist, error)
}
