<template>
  <div class="about-us">
    <div class="container">
      <h1>About Us</h1>
      <section class="company-info">
        <h2>Team Information</h2>
        <p>
          Our Team was founded in 2024 with the mission to revolutionize the way
          developers create and share coding challenges.
        </p>
      </section>

      <section class="team">
        <h2>Our Team</h2>
        <div v-if="loading">Loading team members...</div>
        <div v-else>
          <TeamMember
            v-for="member in teamMembers"
            :key="member.id"
            :member="member"
          />
        </div>
      </section>

      <section class="vision">
        <h2>Our Vision</h2>
        <p>
          To become the leading platform for developers to learn, practice, and
          collaborate on coding challenges.
        </p>
      </section>

      <section class="contact">
        <h2>Contact Us</h2>
        <p><strong>Email:</strong> contact@example.com</p>
      </section>
    </div>
  </div>
</template>

<script>
import TeamMember from "./TeamMember.vue";

export default {
  name: "AboutUs",
  components: {
    TeamMember,
  },
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: "黄伟聪",
          role: "组员",
          bio: "负责基础框架的搭建+执行代码沙箱的开发+docker环境部署",
          image: "/images/hwc.jpg",
        },
        {
          id: 2,
          name: "罗弘杰",
          role: "组长",
          bio: "前端基础框架搭建+前端开发",
          image: "/images/lhj.jpg",
        },
        {
          id: 3,
          name: "刘启高",
          role: "组员",
          bio: "前端开发，前端代码编辑器+文档编辑器接入。",
          image: "/images/lqg.jpg",
        },
        {
          id: 4,
          name: "王芃瀚",
          role: "组员",
          bio: "题目CRUD相关接口开发，及完成相关数据库设计，",
          image: "/images/wph.jpg",
        },
        {
          id: 5,
          name: "吴东升",
          role: "组员",
          bio: "用户管理及AOP权限管理的实现，实现用户密码加密存储，用户数据库设计",
          image: "/images/wds.jpg",
        },
        {
          id: 6,
          name: "陈伟濠",
          role: "组员",
          bio: "提交题目及相关判题模块协作开发，相关数据库设计",
          image: "/images/cwh.jpg",
        },
      ],
      loading: false,
    };
  },
  created() {
    // Simulate fetching data from an API
    // In a real application, you would fetch data from an API here
    // For this example, we'll use the static data defined in the teamMembers array
    this.loading = false;
  },
};
</script>

<style scoped>
.about-us {
  background-color: #f8f9fa;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1,
h2 {
  color: #333;
}

.company-info,
.team,
.vision,
.contact {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-member {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.team-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.member-info h3 {
  margin-top: 0;
  color: #007bff;
}

.contact p {
  margin: 5px 0;
}
</style>
