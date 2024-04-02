package task

type UpdateTaskRequest struct {
	Title    string `json:"title"`
	Status   string `json:"status"`
	Deadline string `json:"deadline"`
}
