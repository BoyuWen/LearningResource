package cn.edu.onest;
/**
 * Student ʵ����
 * @author lww
 *
 */
public class Student {
	private String name;
	private int score;
	private Grade grade;
	
	//���췽��
	public Student(String name, int score) {
		super();
		this.name = name;
		this.score = score;
		setGrade();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public Grade getGrade() {
		return grade;
	}

	//���ݳɼ��ж�����
	public void setGrade() {
		if(this.score > 90){
			this.grade = Grade.A;
		}else if(this.score > 80){
			this.grade = Grade.B;
		}else if(this.score > 70){
			this.grade = Grade.C;
		}
	}

	@Override
	public String toString() {
		return "Student [name=" + name + ", score=" + score + ", grade=" + grade + "]";
	}
	
	
}

enum Grade{
	A, B, C, D, E
}