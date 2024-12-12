<template>
  <div class="team-member">
    <img :src="member.image" alt="Team Member" class="team-image" />
    <div class="member-info">
      <h3>{{ member.name }}</h3>
      <p><strong>Role:</strong> {{ member.role }}</p>
      <p>{{ member.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamMember",
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
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
</style>
