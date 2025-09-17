

export class QuestionViewModel {
  id: string
  body: string
  correctAnswers: string[]
  published: boolean
  createdAt: string
  updatedAt: string | null
}

export class QuestionViewModelForPairs {
  id: string
  body: string
}
