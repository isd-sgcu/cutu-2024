

export class SubmissionPackage {
  gid: string
  key: string
  count: number
  constructor(gid: string, key: string, count: number) {
    this.gid = gid
    this.key = key
    this.count = count
    this.clamp()
  }

  static fromObject(obj: any): SubmissionPackage {
    return new SubmissionPackage(obj.gid, obj.key, obj.count)
  }

  private clamp() {
    this.count = Math.max(0, this.count)
    this.count = Math.min(parseInt(process.env.CLAMP_MAX || '100'), this.count)
  }
}
