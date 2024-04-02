package checklist

import (
	"server/model"
	request "server/request/checklist"
)

type Service interface {
	FindAllByTask(TaskID int) ([]model.Checklist, error)
	CreateNew(checklist request.CreateChecklistRequest) (model.Checklist, error)
}
