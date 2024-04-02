package response

type Checklistresponse struct {
	Title  string `json:"title"`
	Status string `json:"status"`
}

type TaskResponse struct {
	ID        int                 `json:"id"`
	Title     string              `json:"title"`
	Status    string              `json:"status"`
	Deadline  string              `json:"deadline"`
	Checklist []Checklistresponse `json:"checklist"`
}
